class Order < ActiveRecord::Base
	self.table_name = 'orders'
  	belongs_to :users
	belongs_to :products
	belongs_to :carts
end