import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './UpgradePlan.css';

const UpgradePlan = () => {
  const [plans, setPlans] = useState([
    {
      id: 1,
      name: 'Monthly',
      duration: 30,
      price: 99,
      features: [
        '✓ Full Access to All Tabs',
        '✓ 30 Days Premium Access',
        '✓ Competitors Analysis',
        '✓ RFI/RFP Tracking',
        '✓ Regulatory Services',
        '✓ Email Support',
      ],
    },
    {
      id: 2,
      name: 'Quarterly',
      duration: 90,
      price: 249,
      popular: true,
      features: [
        '✓ Full Access to All Tabs',
        '✓ 90 Days Premium Access',
        '✓ Competitors Analysis',
        '✓ RFI/RFP Tracking',
        '✓ Regulatory Services',
        '✓ Priority Email Support',
        '✓ Save 15%',
      ],
    },
    {
      id: 3,
      name: 'Yearly',
      duration: 365,
      price: 899,
      features: [
        '✓ Full Access to All Tabs',
        '✓ 365 Days Premium Access',
        '✓ Competitors Analysis',
        '✓ RFI/RFP Tracking',
        '✓ Regulatory Services',
        '✓ 24/7 Priority Support',
        '✓ Save 25%',
      ],
    },
  ]);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data.user);
      } catch (err) {
        console.error('Failed to fetch user:', err);
      }
    };

    fetchUser();
  }, []);

  const handleUpgrade = async (plan) => {
    if (user?.isPaid) {
      toast.error('You already have an active paid plan!');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token');

      // Step 1: Create order
      const orderResponse = await axios.post(
        '/api/payment/create-order',
        {
          amount: plan.price,
          planDuration: plan.duration,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const options = {
        key: 'rzp_test_1234567890', // Replace with your Razorpay Key ID
        amount: orderResponse.data.amount,
        currency: orderResponse.data.currency,
        order_id: orderResponse.data.orderId,
        handler: async (response) => {
          try {
            // Step 2: Verify payment on backend
            const verifyResponse = await axios.post(
              '/api/payment/verify-payment',
              {
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                planDuration: plan.duration,
              },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );

            if (verifyResponse.data.success) {
              toast.success('Payment successful! Your account has been upgraded.');
              // Refresh user data
              const userResponse = await axios.get('/api/auth/me', {
                headers: { Authorization: `Bearer ${token}` },
              });
              setUser(userResponse.data.user);
            }
          } catch (err) {
            toast.error('Payment verification failed');
          }
        },
        prefill: {
          email: user?.email,
        },
        theme: {
          color: '#667eea',
        },
      };

      // Initialize Razorpay
      const Razorpay = window.Razorpay;
      const rzp = new Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error('Failed to initiate payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upgrade-plan">
      <div className="container main-content">
        <div className="upgrade-header">
          <h1>Upgrade Your Plan</h1>
          <p>Unlock premium features and access to exclusive content</p>
          {user?.isPaid && (
            <div className="premium-badge">
              ✓ You have an active paid plan until {new Date(user.paidTill).toLocaleDateString()}
            </div>
          )}
        </div>

        <div className="plans-grid">
          {plans.map(plan => (
            <div key={plan.id} className={`plan-card ${plan.popular ? 'popular' : ''}`}>
              {plan.popular && <div className="popular-badge">POPULAR</div>}
              <h2>{plan.name}</h2>
              <div className="price">
                <span className="amount">₹{plan.price}</span>
                <span className="duration">for {plan.duration} days</span>
              </div>
              <ul className="features">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              <button
                className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => handleUpgrade(plan)}
                disabled={loading}
              >
                {user?.isPaid ? 'You Are Premium' : 'Get Started'}
              </button>
            </div>
          ))}
        </div>

        <div className="payment-methods">
          <h2>Payment Methods Supported</h2>
          <div className="methods-grid">
            <div className="method-card">
              <div className="icon">📱</div>
              <h3>UPI</h3>
              <p>Pay securely using UPI applications</p>
            </div>
            <div className="method-card">
              <div className="icon">💳</div>
              <h3>Credit Cards</h3>
              <p>Visa, Mastercard, American Express</p>
            </div>
            <div className="method-card">
              <div className="icon">🏦</div>
              <h3>Debit Cards</h3>
              <p>All major debit cards accepted</p>
            </div>
            <div className="method-card">
              <div className="icon">🔒</div>
              <h3>Secure Payment</h3>
              <p>Powered by Razorpay - PCI DSS Compliant</p>
            </div>
          </div>
        </div>

        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>What happens after I upgrade?</h3>
              <p>You'll immediately get access to all premium features including Competitors, RFI/RFP, Regulatory Services, and Reg. Tools tabs.</p>
            </div>
            <div className="faq-item">
              <h3>Can I cancel my subscription?</h3>
              <p>Yes, you can cancel anytime. Your access will remain until the end of your current billing period.</p>
            </div>
            <div className="faq-item">
              <h3>Is my payment information secure?</h3>
              <p>Yes! We use Razorpay, which is PCI DSS compliant and uses industry-standard encryption for all transactions.</p>
            </div>
            <div className="faq-item">
              <h3>Do you offer refunds?</h3>
              <p>We offer a 7-day money-back guarantee. Contact support for more information.</p>
            </div>
          </div>
        </div>
      </div>
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    </div>
  );
};

export default UpgradePlan;
