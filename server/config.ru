require 'bundler'
Bundler.require


require './models/UserModel'
require './models/ProductModel'
require './models/OrderModel'
require './models/CartModel'
require './models/ReviewModel'

require './controllers/ApplicationController'
require './controllers/ProductController'
require './controllers/UserController'
require './controllers/OrderController'
require './controllers/ReviewController'
require './controllers/ChargesController'

run Sinatra::Application

ActiveRecord::Base.establish_connection(
  adapter: 'postgresql',
  database: 'store'
)


map('/products'){run ProductController}
map('/users'){run UserController}	
map('/orders'){run OrderController}
map('/reviews'){run ReviewController}
map('/register'){run UserController}
map('/charges'){run ChargesController}

