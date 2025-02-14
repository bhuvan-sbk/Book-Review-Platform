// components/UserProfile.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';

const UserProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const { status, error } = useSelector((state) => state.users);

  if (!user) {
    return (
      <div className="container mt-5 pt-4">
        <Alert variant="warning">
          Please log in to view your profile.
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mt-5 pt-4">
      <div className="card">
        <div className="card-header bg-light">
          <div className="d-flex align-items-center">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt="Profile"
                className="rounded-circle me-3"
                style={{ width: '60px', height: '60px', objectFit: 'cover' }}
              />
            ) : (
              <div 
                className="rounded-circle me-3 bg-primary text-white d-flex align-items-center justify-content-center"
                style={{ width: '60px', height: '60px', fontSize: '24px' }}
              >
                {user.username[0].toUpperCase()}
              </div>
            )}
            <div>
              <h4 className="mb-0">{user.username}</h4>
              <small className="text-muted">Member since {new Date(user.createdAt).toLocaleDateString()}</small>
            </div>
          </div>
        </div>
        
        <div className="card-body">
          {error && (
            <Alert variant="danger" className="mb-4">
              {error}
            </Alert>
          )}
          
          <div className="row">
            <div className="col-md-6">
              <h5 className="mb-4">Profile Information</h5>
              <div className="mb-3">
                <label className="text-muted">Username</label>
                <p className="mb-0">{user.username}</p>
              </div>
              <div className="mb-3">
                <label className="text-muted">Email</label>
                <p className="mb-0">{user.email}</p>
              </div>
            </div>
            
            <div className="col-md-6">
              <h5 className="mb-4">Activity</h5>
              <div className="mb-3">
                <label className="text-muted">Reviews</label>
                <p className="mb-0">{user.reviews?.length || 0} reviews written</p>
              </div>
              <div className="mb-3">
                <label className="text-muted">Last Login</label>
                <p className="mb-0">
                  {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {user.reviews && user.reviews.length > 0 && (
            <div className="mt-4">
              <h5 className="mb-4">Recent Reviews</h5>
              <div className="list-group">
                {user.reviews.slice(0, 5).map(review => (
                  <div key={review._id} className="list-group-item">
                    <div className="d-flex justify-content-between align-items-center">
                      <h6 className="mb-1">{review.book?.title}</h6>
                      <span className="badge bg-primary">★ {review.rating}</span>
                    </div>
                    <p className="mb-1">{review.comment}</p>
                    <small className="text-muted">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;