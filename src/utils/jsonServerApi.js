/**
 * JSON Server API utility functions
 * Base URL: http://localhost:3001/api
 */

const API_BASE_URL = 'http://localhost:3001/api';

/**
 * Sign up a new user
 * Sends a POST request to create a new user in db.json
 * @param {Object} userData - User signup data
 * @param {string} userData.name - User's full name
 * @param {string} userData.email - User's email address
 * @param {string} userData.password - User's password
 * @returns {Promise<Object>} The created user object with id
 */
export const signupUser = async (userData) => {
  try {
    // Check if user already exists
    const checkResponse = await fetch(
      `${API_BASE_URL}/users?email=${encodeURIComponent(userData.email)}`
    );
    
    if (!checkResponse.ok) {
      throw new Error('Failed to check existing users');
    }

    // Check if response is JSON (not HTML)
    const contentType = checkResponse.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('JSON Server is not running. Please run "npm run server" in a separate terminal.');
    }

    let existingUsers;
    try {
      existingUsers = await checkResponse.json();
    } catch (jsonError) {
      if (jsonError.message.includes('JSON')) {
        throw new Error('JSON Server is not running. Please run "npm run server" in a separate terminal.');
      }
      throw jsonError;
    }
    
    if (Array.isArray(existingUsers) && existingUsers.length > 0) {
      throw new Error('Email already registered');
    }

    // Create new user
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        createdAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('JSON Server is not running. Please run "npm run server" in a separate terminal.');
      }
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Server error: ${response.status} ${response.statusText}`);
    }

    let newUser;
    try {
      newUser = await response.json();
    } catch (jsonError) {
      if (jsonError.message.includes('JSON')) {
        throw new Error('JSON Server is not running. Please run "npm run server" in a separate terminal.');
      }
      throw jsonError;
    }
    return {
      success: true,
      user: newUser,
    };
  } catch (error) {
    console.error('Signup error:', error);
    return {
      success: false,
      error: error.message || 'Failed to sign up. Please try again.',
    };
  }
};

/**
 * Login a user
 * Fetches users from db.json and checks email + password
 * @param {Object} credentials - User login credentials
 * @param {string} credentials.email - User's email address
 * @param {string} credentials.password - User's password
 * @returns {Promise<Object>} The user object if login successful
 */
export const loginUser = async (credentials) => {
  try {
    // Fetch user by email
    const response = await fetch(
      `${API_BASE_URL}/users?email=${encodeURIComponent(credentials.email)}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    // Check if response is JSON (not HTML)
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('JSON Server is not running. Please run "npm run server" in a separate terminal.');
    }

    let users;
    try {
      users = await response.json();
    } catch (jsonError) {
      if (jsonError.message.includes('JSON')) {
        throw new Error('JSON Server is not running. Please run "npm run server" in a separate terminal.');
      }
      throw jsonError;
    }

    // Check if user exists
    if (!Array.isArray(users) || users.length === 0) {
      return {
        success: false,
        error: 'User not found',
      };
    }

    const user = users[0];

    // Verify password
    if (user.password !== credentials.password) {
      return {
        success: false,
        error: 'Invalid password',
      };
    }

    // Return user data (without password for security)
    const { password, ...userWithoutPassword } = user;
    
    return {
      success: true,
      user: userWithoutPassword,
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      error: error.message || 'Failed to log in. Please try again.',
    };
  }
};

/**
 * Get contact requests made by a specific user
 * Fetches saved messages from db.json (requests collection)
 * @param {number} userId - User ID
 * @returns {Promise<Object>} List of requests
 */
export const getRequestsByUserId = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/requests?userId=${userId}`);

    if (!response.ok) {
      throw new Error('Failed to fetch requests');
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error(
        'JSON Server is not running. Please run "npm run server" in a separate terminal.'
      );
    }

    let requests;
    try {
      requests = await response.json();
    } catch (jsonError) {
      if (jsonError.message.includes('JSON')) {
        throw new Error(
          'JSON Server is not running. Please run "npm run server" in a separate terminal.'
        );
      }
      throw jsonError;
    }

    return {
      success: true,
      requests: Array.isArray(requests) ? requests : [],
    };
  } catch (error) {
    console.error('Get requests error:', error);
    return {
      success: false,
      error: error.message || 'Failed to fetch requests. Please try again.',
      requests: [],
    };
  }
};

/**
 * Delete all contact requests made by a specific user
 * Used when a user deletes their account so their requests are also removed
 * @param {number} userId - User ID
 * @returns {Promise<Object>} Result status
 */
export const deleteRequestsByUserId = async (userId) => {
  try {
    // Fetch all requests for this user
    const listResult = await getRequestsByUserId(userId);
    if (!listResult.success) {
      throw new Error(listResult.error || 'Failed to fetch user requests');
    }

    const requests = listResult.requests || [];
    if (!requests.length) {
      return { success: true, deleted: 0 };
    }

    // Delete each request by id
    await Promise.all(
      requests.map((req) =>
        fetch(`${API_BASE_URL}/requests/${req.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })
      )
    );

    return { success: true, deleted: requests.length };
  } catch (error) {
    console.error('Delete requests error:', error);
    return {
      success: false,
      error: error.message || 'Failed to delete user requests.',
    };
  }
};

/**
 * Update user details
 * Updates user information in db.json
 * @param {number} userId - User ID
 * @param {Object} userData - Updated user data
 * @param {string} userData.name - User's full name
 * @param {string} userData.email - User's email address
 * @param {string} userData.password - User's password (optional)
 * @returns {Promise<Object>} The updated user object
 */
export const updateUser = async (userId, userData) => {
  try {
    // Check if email is being changed and if it's already taken
    if (userData.email) {
      const checkResponse = await fetch(
        `${API_BASE_URL}/users?email=${encodeURIComponent(userData.email)}`
      );
      
      if (checkResponse.ok) {
        const contentType = checkResponse.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const existingUsers = await checkResponse.json();
          // Check if email exists for a different user
          if (Array.isArray(existingUsers) && existingUsers.length > 0) {
            const otherUser = existingUsers.find(u => u.id !== userId);
            if (otherUser) {
              throw new Error('Email already registered by another user');
            }
          }
        }
      }
    }

    // Update user
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...userData,
        updatedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('JSON Server is not running. Please run "npm run server" in a separate terminal.');
      }
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Server error: ${response.status} ${response.statusText}`);
    }

    let updatedUser;
    try {
      updatedUser = await response.json();
    } catch (jsonError) {
      if (jsonError.message.includes('JSON')) {
        throw new Error('JSON Server is not running. Please run "npm run server" in a separate terminal.');
      }
      throw jsonError;
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = updatedUser;

    return {
      success: true,
      user: userWithoutPassword,
    };
  } catch (error) {
    console.error('Update user error:', error);
    return {
      success: false,
      error: error.message || 'Failed to update user. Please try again.',
    };
  }
};

/**
 * Delete user account
 * Deletes user from db.json
 * @param {number} userId - User ID to delete
 * @returns {Promise<Object>} Success status
 */
export const deleteUser = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('JSON Server is not running. Please run "npm run server" in a separate terminal.');
      }
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Server error: ${response.status} ${response.statusText}`);
    }

    return {
      success: true,
      message: 'Account deleted successfully',
    };
  } catch (error) {
    console.error('Delete user error:', error);
    return {
      success: false,
      error: error.message || 'Failed to delete account. Please try again.',
    };
  }
};

/**
 * Get user by ID
 * Fetches a specific user from db.json
 * @param {number} userId - User ID
 * @returns {Promise<Object>} The user object
 */
export const getUserById = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`);

    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('JSON Server is not running. Please run "npm run server" in a separate terminal.');
    }

    let user;
    try {
      user = await response.json();
    } catch (jsonError) {
      if (jsonError.message.includes('JSON')) {
        throw new Error('JSON Server is not running. Please run "npm run server" in a separate terminal.');
      }
      throw jsonError;
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = user;

    return {
      success: true,
      user: userWithoutPassword,
    };
  } catch (error) {
    console.error('Get user error:', error);
    return {
      success: false,
      error: error.message || 'Failed to fetch user. Please try again.',
    };
  }
};

