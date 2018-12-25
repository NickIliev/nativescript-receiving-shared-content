
import * as application from "tns-core-modules/application";
import { Page, Observable, EventData } from "tns-core-modules/ui/page/page";
import { isAndroid } from "tns-core-modules/platform";

let vm = new Observable();

export function navigatingTo(args: EventData) {

    let page = <Page>args.object;
    
    page.bindingContext = vm;

    if (isAndroid) {
        application.android.on(application.AndroidApplication.activityCreatedEvent, function (args) {
            let activity = args.activity;
            // Get intent, action and MIME type
            let intent = activity.getIntent();
            let action = intent.getAction();
            let type = intent.getType();
    
            if (android.content.Intent.ACTION_SEND === action && type != null) {
                if (type.startsWith("text/")) {
                    handleSendText(intent); // Handle text being sent
                } else if (type.startsWith("image/")) {
                    handleSendImage(intent); // Handle single image being sent
                }
            } else if (android.content.Intent.ACTION_SEND_MULTIPLE === action && type != null) {
                if (type.startsWith("image/")) {
                    handleSendMultipleImages(intent); // Handle multiple images being sent
                }
            } else {
                // Handle other intents, such as being started from the home screen
            }
        });
    }
}

function handleSendText(intent: android.content.Intent) {
    if (isAndroid) {
        let sharedText = intent.getStringExtra(android.content.Intent.EXTRA_TEXT);
        if (sharedText != null) {
            // Update UI to reflect text being shared
            console.log("sharedText: ", sharedText);
            console.log("Text received!");
            vm.set("sharedText", sharedText);
        }
    }
}

function handleSendImage(intent: android.content.Intent) {
    if (isAndroid) {
        let imageUri = <android.net.Uri>intent.getParcelableExtra(android.content.Intent.EXTRA_STREAM);
        if (imageUri != null) {
            // Update UI to reflect image being shared

            console.log("Image received!");

            let appContext = application.android.context;
            let bitmap = android.provider.MediaStore.Images.Media.getBitmap(appContext.getContentResolver(), imageUri)
            console.log("bitmap: ", bitmap);

            vm.set("bitmap", bitmap);
        }
    }
}

function handleSendMultipleImages(intent: android.content.Intent) {
    if (isAndroid) {
        let imageUris = intent.getParcelableArrayListExtra(android.content.Intent.EXTRA_STREAM);
        if (imageUris != null) {
            // Update UI to reflect multiple images being shared
            console.log("imageUris: ", imageUris);
            console.log("Multiple images received!");
        }
    }
}

