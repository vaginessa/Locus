Locus::Application.routes.draw do
  root to: 'static_pages#root'
  
  resources :users
  resource :session, only: [:new, :create, :destroy]
  
  
  namespace :api, defaults: { format: :json } do
    resources :pieces
    resources :images
  end
  
end
