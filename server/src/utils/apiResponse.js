/**
 * Standardized API response utility.
 * Ensures all API responses follow a consistent format.
 */

export class ApiResponse {
  /**
   * Send a success response.
   * @param {import('express').Response} res
   * @param {object} options
   * @param {number} [options.statusCode=200]
   * @param {string} [options.message='Success']
   * @param {*} [options.data=null]
   */
  static success(res, { statusCode = 200, message = 'Success', data = null } = {}) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      error: null,
    });
  }

  /**
   * Send an error response.
   * @param {import('express').Response} res
   * @param {object} options
   * @param {number} [options.statusCode=500]
   * @param {string} [options.message='Internal Server Error']
   * @param {*} [options.error=null]
   */
  static error(res, { statusCode = 500, message = 'Internal Server Error', error = null } = {}) {
    return res.status(statusCode).json({
      success: false,
      message,
      data: null,
      error,
    });
  }

  /**
   * Send a paginated response.
   * @param {import('express').Response} res
   * @param {object} options
   * @param {Array} options.data
   * @param {number} options.page
   * @param {number} options.limit
   * @param {number} options.total
   * @param {string} [options.message='Success']
   */
  static paginated(res, { data, page, limit, total, message = 'Success' }) {
    return res.status(200).json({
      success: true,
      message,
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
      error: null,
    });
  }
}
