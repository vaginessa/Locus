Locus::Application.routes.draw do
  root to: 'static_pages#root'
  
  resources :users
  resource :session, only: [:new, :create, :destroy]
  
  
  namespace :api, defaults: { format: :json } do
    resources :pieces
    resources :images
    resources :audio
    resources :videos
    resources :follow_units
    resources :profiles
    resources :tags
    resources :tag_units
    resources :media
  end
  
end
