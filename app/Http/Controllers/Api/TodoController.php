<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Todo;

class TodoController extends Controller
{
    private $sucess_status = 200;

    public function todos()
    {
        // we find todo of a specific user
        $todos = array();
        $user = Auth::user();
        $todos = Todo::where("user_id", $user->id)->get();

        if(count($todos) > 0) {
            return response()->json([
                "status" => $this->sucess_status, 
                "success" => true, 
                "count" => count($todos), 
                "data" => $todos
            ]);
        }

        else {
            return response()->json([
                "status" => "failed", 
                "success" => false, 
                "message" => "Whoops! no todo found"
            ]);
        }
    }

    public function createTodo(Request $request)
    {
        $user = Auth::user();
        $validator = Validator::make($request->all(), [
            'body' => 'required|string|max:255'
        ]);
        
        if($validator->fails()) {
            return response()->json([
                "validation_errors" => $validator->errors()
            ]);
        }

        $new_todo = new Todo;
        $new_todo->body = $request->get("body");
        $new_todo->user_id = $user->id;
        $new_todo->save();

        if(!is_null($new_todo)) {
            return response()->json([
                "status" => $this->sucess_status, 
                "success" => true, 
                "data" => $new_todo
            ]);
        }

        else {
            return response()->json([
                "status" => "failed", 
                "success" => false, 
                "message" => "Whoops! task not created."
            ]);
        }
    }

    public function updateTodo(Request $request, $id)
    {
        $user = Auth::user();
        $validator = Validator::make($request->all(), [
            "body" => 'required|max:255',
        ]);
        
        if($validator->fails()) {
            return response()->json([
                "validation_errors" => $validator->errors()
            ]);
        }

        // find todo user want to update
        $todo = Todo::find($id);
        
        if(!is_null($todo)) {
            $todo->body = $request->get("body");
            $todo->save();
            
            return response()->json([
                "status" => $this->sucess_status, 
                "success" => true, 
                "data" => $todo
            ]);
        } else {
            // not found todo so we return error
            return response()->json([
                "status" => "failed", 
                "success" => false, 
                "message" => "Alert! todo not found"
            ]);
        }
    }

    public function deleteTodo($id)
    {
        $user = Auth::user();
        if($id == 'undefined' || $id == "") {
            // return error if user try delete without id
            return response()->json([
                "status" => "failed", 
                "success" => false, 
                "message" => "Alert! Delete with ID todo pls!"]);
        }
        // find todo user want to delete
        $todo = Todo::where("id", $id)->get();
        
        if(!is_null($todo)) {
            $delete_status = Todo::where("id", $id)->delete();; // try to delete todo
            if($delete_status == 1) {
                // return if todo get out of our database
                return response()->json([
                    "status" => $this->sucess_status, 
                    "success" => true, 
                    "message" => "Success! todo deleted"
                ]);
            }
            else {
                // something wrong when we delete so return error
                return response()->json([
                    "status" => "failed", 
                    "success" => false, 
                    "message" => "Alert! todo not deleted"
                ]);
            }
        } else {
            // not found todo so we return error
            return response()->json([
                "status" => "failed", 
                "success" => false, 
                "message" => "Alert! todo not found"
            ]);
        }
    }
}