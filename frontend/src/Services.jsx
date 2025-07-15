import React from 'react';
import Nav from './Nav';
import { FaPenFancy, FaUsers, FaComments, FaHeadset } from 'react-icons/fa';

export default function Services() {
  return (
    <>
      <Nav />
      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="text-primary fw-bold">Our Features</h1>
          <p className="text-muted">Powerful tools to help you connect, share, and grow your presence online.</p>
        </div>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body text-center">
                <FaPenFancy className="text-primary fs-1 mb-3" />
                <h5 className="card-title fw-semibold">Create Posts</h5>
                <p className="card-text text-muted">
                  Share your thoughts, updates, and photos with your followers anytime, anywhere.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body text-center">
                <FaUsers className="text-success fs-1 mb-3" />
                <h5 className="card-title fw-semibold">Connect with Users</h5>
                <p className="card-text text-muted">
                  Follow other users, interact with their posts, and build your social circle.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body text-center">
                <FaComments className="text-info fs-1 mb-3" />
                <h5 className="card-title fw-semibold">Real-time Interaction</h5>
                <p className="card-text text-muted">
                  Like, comment, and engage in real-time conversations with your network.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 offset-md-4">
            <div className="card h-100 shadow-sm border-0 mt-4">
              <div className="card-body text-center">
                <FaHeadset className="text-warning fs-1 mb-3" />
                <h5 className="card-title fw-semibold">24/7 Support</h5>
                <p className="card-text text-muted">
                  Need help? Our team is available round the clock to support you with any issue.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
