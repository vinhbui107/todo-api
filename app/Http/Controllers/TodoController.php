<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Todo;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $todos = Todo::all();
        return response()->json($todos);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        if(Todo::where('id', $id)->exists()) {
            $todo = Todo::find($id);

            return response()->json($todo, 202);
        } else {
            return response()->json([
                "message" => 'todo not found'
            ], 404);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $todo = new Todo;
        $todo->user_id = $request->user_id;
        $todo->body = $request->body;
        $todo->created_at = $request->created_at;
        $todo->updated_at = $request->updated_at;
        $todo->save();

        return response()->json([
            "message" => "todo record created"
        ], 201);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        if(Todo::where('id', $id)->exists()) {
            $todo = Todo::findorFail($id);

            $todo->body = $request->body;
            $todo->updated_at = $request->updated_at;

            $todo->save();

            return response()->json([
                'message' => 'Succesfully Deleted'
            ], 200);
        } else {
            return response()->json([
                "message" => 'todo not found'
            ], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if(Todo::where('id', $id)->exists()) {
            $todo = Todo::findorFail($id);
            $todo->delete();

            return response()->json([
                'message' => 'Succesfully Deleted'
            ], 204);
        } else {
            return response()->json([
                "message" => 'todo not found'
            ], 404);
        }
    }
}
