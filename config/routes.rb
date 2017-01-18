Rails.application.routes.draw do
  root 'static_pages#home'
  get '/team', to: 'static_pages#team'
  get '/about', to: 'static_pages#about'
  get '/home', to: 'static_pages#home'
  get '/help', to: 'static_pages#help'
  get '/signup', to: 'users#new'
  get '/search', to: 'polies#index'
  get '/polies', to: 'polies#index'
  get '/polies/new', to: 'polies#new'
  resources :users
  resources :polies
end
