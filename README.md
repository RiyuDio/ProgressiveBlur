Progressive Blur is a JavaScript function designed to create a progressive blur effect on specified HTML elements. This readme provides an overview of how to use the function and its parameters.

**How to Use**

Include the Progressive Blur script in your HTML file.

Add the ProgressiveBlur="parent" attribute to the HTML elements you want to apply the blur effect to. This parent should overlay whatever is being progressively blured, most cases the parent would be in an absolute or fixed position at either ends (top or bottom) of the whatever is being progressively blured 

Optionally, you can customize the blur effect by adding the following attributes to the parent elements:

**ProgressiveColor**: Specify the color of the blur effect. Default is white (#FFFFFF). Set to "invisible" to only use colorless blurs. Typically, this color is based on your background color.

**ProgressiveDirection:** Specify the direction of the blur effect. Default is "down". Options include "up" and "down". Down = The blur fades out from direction up to down. Up = The blur fades out from direction down to up. If that makes any sense at all.

**ProgressiveIntensity:** Specify the intensity of the blur effect.

![image](https://github.com/RiyuDio/ProgressiveBlur/assets/132917131/a77f558c-2f99-4163-9d4c-98b71aa34e7f)

**The Progressive blur at the top of this image is setup like this:** There us just a div that floats above the text group, with these attributes present: ProgressiveBlur="parent", ProgressiveDirection="up", ProgressiveColor="#FFFFFF", ProgressiveIntensity="4"

![Uploading image.png…]()
