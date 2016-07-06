class Notification < ApplicationRecord
	after_create_commit {ActionCable.server.broadcast "notification_channel", {message: self.content}}
end
