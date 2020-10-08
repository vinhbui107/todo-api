<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Carbon\Carbon;
use App\User;


class AuthController extends Controller
{

    public function signup(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $user = new User([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);

        $user->save();

        return response()->json([
            'message' => "Successfully created user"
        ], 201);
    }

    public function login(Request $request) {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:6|confirmed',
            'remember_me' => 'boolean'
        ]);

        $credentials = request(['email', 'password']);

        if(!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }

        $user = $request->user();

        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;

        if($request->remember_me)
            $token->expires_at = Carbon::now()->addWeeks(1);

        $token->save();

        return response()->json([
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString()
        ]);
    }

    public function logout(Request $request) {
        $user = Auth::user();
        if(!is_null($user)) {
            auth()->user()->token()->revoke();
            return response()->json([
                "status" => $this->sucess_status,
                "success" => true,
                "user" => $user
            ]);
        }
        else {
            return response()->json([
                "status" => "failed",
                "success" => false,
                "message" => "Whoops! no user found"
            ]);
        }
    }

    public function user(Request $request) {
        $user = Auth::user();
        if(!is_null($user)) {
            return response()->json([
                "status" => $this->sucess_status,
                "success" => true,
                "user" => $user
            ]);
        }
        else {
            return response()->json([
                "status" => "failed",
                "success" => false,
                "message" => "Whoops! no user found"
            ]);
        }
    }
}
