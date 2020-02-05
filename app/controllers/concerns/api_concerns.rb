module ApiConcerns
  extend ActiveSupport::Concern

  def authentication_token
    request.headers['X-IWA-AUTHORIZE']
  end

  def current_api_user
    return current_user if current_user.present?
    return User.find_by(authentication_token: authentication_token)
  end
end