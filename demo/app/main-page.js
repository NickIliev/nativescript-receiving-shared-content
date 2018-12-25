"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var application = require("tns-core-modules/application");
var page_1 = require("tns-core-modules/ui/page/page");
var platform_1 = require("tns-core-modules/platform");
var vm = new page_1.Observable();
function navigatingTo(args) {
    var page = args.object;
    page.bindingContext = vm;
    if (platform_1.isAndroid) {
        application.android.on(application.AndroidApplication.activityCreatedEvent, function (args) {
            var activity = args.activity;
            // Get intent, action and MIME type
            var intent = activity.getIntent();
            var action = intent.getAction();
            var type = intent.getType();
            if (android.content.Intent.ACTION_SEND === action && type != null) {
                if (type.startsWith("text/")) {
                    handleSendText(intent); // Handle text being sent
                }
                else if (type.startsWith("image/")) {
                    handleSendImage(intent); // Handle single image being sent
                }
            }
            else if (android.content.Intent.ACTION_SEND_MULTIPLE === action && type != null) {
                if (type.startsWith("image/")) {
                    handleSendMultipleImages(intent); // Handle multiple images being sent
                }
            }
            else {
                // Handle other intents, such as being started from the home screen
            }
        });
    }
}
exports.navigatingTo = navigatingTo;
function handleSendText(intent) {
    if (platform_1.isAndroid) {
        var sharedText = intent.getStringExtra(android.content.Intent.EXTRA_TEXT);
        if (sharedText != null) {
            // Update UI to reflect text being shared
            console.log("sharedText: ", sharedText);
            console.log("Text received!");
            vm.set("sharedText", sharedText);
        }
    }
}
function handleSendImage(intent) {
    if (platform_1.isAndroid) {
        var imageUri = intent.getParcelableExtra(android.content.Intent.EXTRA_STREAM);
        if (imageUri != null) {
            // Update UI to reflect image being shared
            console.log("Image received!");
            var appContext = application.android.context;
            var bitmap = android.provider.MediaStore.Images.Media.getBitmap(appContext.getContentResolver(), imageUri);
            console.log("bitmap: ", bitmap);
            vm.set("bitmap", bitmap);
        }
    }
}
function handleSendMultipleImages(intent) {
    if (platform_1.isAndroid) {
        var imageUris = intent.getParcelableArrayListExtra(android.content.Intent.EXTRA_STREAM);
        if (imageUris != null) {
            // Update UI to reflect multiple images being shared
            console.log("imageUris: ", imageUris);
            console.log("Multiple images received!");
        }
    }
}
