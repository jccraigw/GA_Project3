require 'bundler'
Bundler.require

require './models/UserModel'
require './models/ProductModel'
require './models/OrderModel'

require './controllers/ApplicationController'
require './controllers/ProductController'
require './controllers/UserController'
require './controllers/OrderController'

run Sinatra::Application

ActiveRecord::Base.establish_connection(
  adapter: 'postgresql',
  database: 'store'
)


map('/products'){run ProductController}
map('/users'){run UserController}	
# map('/orders'){run OrderController}