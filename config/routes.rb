Rails.application.routes.draw do
  root 'dashboard#index'

  namespace :api do
    namespace :v1 do
      post 'login', to: 'auth#login'
    end
  end
end
