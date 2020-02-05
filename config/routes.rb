Rails.application.routes.draw do
  devise_for :users, only: []

  root 'dashboard#index'

  namespace :api do
    namespace :v1 do
      post 'login', to: 'auth#login'
      resources :users, only: [:index, :create] do
        collection do
          get :roles
        end
      end
    end
  end

  get '*page', to: 'dashboard#index', constraints: ->(req) do
    !req.xhr? && req.format.html?
  end
end
