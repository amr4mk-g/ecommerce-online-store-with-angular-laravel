<?php

use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('welcome');
// });

// Route::get('/setup', function () {
//     $credentials = ['email'=>'admin@ex.com', 'password'=>'pass'];
//     if (!Auth::attempt($credentials)) {
//         $user = new \App\Models\User();
//         $user->name = 'Admin';
//         $user->email = $credentials['email'];
//         $user->password = Hash::make($credentials['password']);
//         $user->save();

//         if (Auth::attempt($credentials)) {
//             $user = Auth::user();
//             $adminToken = $user->createToken('cAdmin', ['create','update','delete']);
//             $updateToken = $user->createToken('uAdmin', ['create','update']);
//             $basicToken = $user->createToken('basic');
//             return ['admin'=>$adminToken->plainTextToken,
//                 'update'=>$updateToken->plainTextToken, 
//                 'basic'=>$basicToken->plainTextToken];
//         }
//     }
// });
