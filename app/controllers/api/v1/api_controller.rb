class Api::V1::ApiController < ActionController::Base
  protect_from_forgery with: :null_session

  skip_before_action :verify_authenticity_token

  include ApiConcerns

  before_action :authenticate_api!

  def authenticate_api!
    if current_api_user.blank?
      render_error('Need login!')
    end
  end

  def authenticate_teacher!
    unless current_api_user.teacher?
      render_error('Not teacher!')
    end
  end

  def render_success(data)
    render json: {
      status: 200,
      result: data
    }
  end

  def render_error(message, status = 500)
    render json: {
      status: status,
      message: message
    }
  end
end