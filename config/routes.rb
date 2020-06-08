Rails.application.routes.draw do
  resources :inventories
  devise_for :users
  get 'dashboard/index'
  get '/home' => 'dashboard#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end