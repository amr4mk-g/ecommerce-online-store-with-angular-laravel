<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Validation\ValidationException;

class ProductController extends Controller
{

    public function getAll()
    {
        $products = Product::all();
        $products = $products->makeHidden(['created_at', 'updated_at']);
        return response()->json(['products' => $products], 200);
    }

    public function addProduct(Request $request)
    {
        $rules = [
            'name' => 'required|string|max:255',
            'description' => 'string|max:1000',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image' => 'required',
            'category' => 'string|max:255',
            'status' => 'string|in:available,out,in',
        ];
        try {
            $validatedData = $this->validate($request, $rules);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 400);
        }

        $img = $request->input('image');
        $image_parts = explode(";base64,", $img);
        $image_type_aux = explode("image/", $image_parts[0]);
        $image_type = $image_type_aux[1];
        $image_base64 = base64_decode($image_parts[1]);
        $file = "images/" . uniqid() . '.' . $image_type;
        file_put_contents($file, $image_base64);

        $validatedData['image'] = asset($file);
        $product = Product::create($validatedData);
        return response()->json(['message' => 'Product created successfully', 'product' => $product], 200);
    }

    public function editProduct(Request $request, $id)
    {
        $rules = [
            'name' => 'required|string|max:255',
            'description' => 'string|max:1000',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'category' => 'string|max:255',
            'status' => 'string|in:available,out_of_stock',
        ];
        try {
            $validatedData = $this->validate($request, $rules);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 400);
        }
        $product = Product::find($id);
        if (!$product) return response()->json(['message' => 'Product not found'], 404);

        if ($request->input('image')) {
            $img = $request->input('image');
            $image_parts = explode(";base64,", $img);
            $image_type_aux = explode("image/", $image_parts[0]);
            $image_type = $image_type_aux[1];
            $image_base64 = base64_decode($image_parts[1]);
            $file = "images/" . uniqid() . '.' . $image_type;
            file_put_contents($file, $image_base64);
            $validatedData['image'] = asset($file);
        }

        $product->update($validatedData);
        return response()->json(['message' => 'Product updated successfully'], 200);
    }

    public function deleteProduct($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        $product->delete();
        return response()->json(['message' => 'Product deleted successfully'], 204);
    }
}
