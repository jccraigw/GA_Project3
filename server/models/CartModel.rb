class Cart < ActiveRecord::Base
	self.table_name = 'carts'
	has_many :orders
end