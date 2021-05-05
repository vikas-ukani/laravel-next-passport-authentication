<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use GuzzleHttp\Promise\all;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:3'
        ]);
        $validator->validate();

        /** After Validation */
        if ($user = User::where('email', $input['email'])->first()) {
            if (Hash::check($input['password'], $user->password)) {
                # Login Success
                $token = $user->createToken('Laravel Password')->accessToken;
                return response(['token' => $token, 'message' => 'Login Successful.'], 200);
            } else {
                return response(["message" => "Invalid Credentials!"], 422);
            }
        } else {
            return response(["message" => 'User does not exist'], 422);
        }
    }

    public function logout()
    {
        dd('logout', request()->all());

        $token = request()->user()->token();
        return response(['token' => $token, 'message' => "Logout success"], 200);
    }

    public function signup(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users,email|max:255',
            'password' => 'required|string|min:3|confirmed'
        ]);

        $validator->validate();

        $input['password'] = Hash::make($input['password']);
        $input['rem_token'] = Str::random(10);
        $user = User::create($input);
        $token = $user->createToken($input['email'])->accessToken;
        return response([
            'token' => $token,
            'message' => 'Registration Success!'
        ], 200);
    }
}
