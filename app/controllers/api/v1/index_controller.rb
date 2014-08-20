class Api::V1::IndexController < ApplicationController
  respond_to :json

  def index
    if current_teacher
      respond_with({app: 'teacherapp'})
    elsif current_student
      respond_with({app: 'studentapp'})
    else
      respond_with ({error: "You must be logged in"}), status: 401
    end
  end

end
