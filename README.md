Progressive Blur is a JavaScript function designed to create a progressive blur effect on specified HTML elements. This readme provides an overview of how to use the function and its parameters.

**How to Use**

Include the Progressive Blur script in your HTML file: 

```<script src="https://cdn.jsdelivr.net/gh/RiyuDio/ProgressiveBlur/ProgressiveBlur.js"></script>```


Add the **```ProgressiveBlur="parent"```** attribute to the HTML elements you want to apply the blur effect to. This parent should overlay whatever is being progressively blured, most cases the parent would be in an absolute or fixed position at either ends (top or bottom) of the whatever is being progressively blured 

Optionally, you can customize the blur effect by adding the following attributes to the parent elements:

**```ProgressiveColor```**: Specify the color of the blur effect. Default is white (#FFFFFF). Set to "invisible" to only use colorless blurs. Typically, this color is based on your background color.

**```ProgressiveDirection```** Specify the direction of the blur effect. Default is "down". Options include "up" and "down". **```Down```** = The blur fades out from direction up to down. **```Up```** = The blur fades out from direction down to up. If that makes any sense at all.

**```ProgressiveIntensity```** Specify the intensity of the blur effect.

![chrome_oSi1DinL47](https://github.com/RiyuDio/ProgressiveBlur/assets/132917131/faa8da7b-4077-4efd-b360-80742f84f708)

**For the Progressive blur at the top of this image, it is setup like this:** There us just a div that is positioned above the text group, with these attributes present: ProgressiveBlur="parent", ProgressiveDirection="up", ProgressiveColor="#FFFFFF", ProgressiveIntensity="4"

![chrome_iqE9xhUjeD](https://github.com/RiyuDio/ProgressiveBlur/assets/132917131/c68730e3-a9e9-4a9b-a0eb-c8070dba9d94)

Essentially looking like this

![image](https://github.com/RiyuDio/ProgressiveBlur/assets/132917131/c0588ae7-cfbf-4dfd-94e1-bb1cd2f76523)
