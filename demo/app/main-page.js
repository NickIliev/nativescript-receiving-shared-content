"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var application = require("tns-core-modules/application");
var page_1 = require("tns-core-modules/ui/page/page");
var vm = new page_1.Observable();
function navigatingTo(args) {
    var page = args.object;
    page.bindingContext = vm;
    application.android.on(application.AndroidApplication.activityCreatedEvent, function (args) {
        var activity = args.activity;
        // Get intent, action and MIME type
        var intent = activity.getIntent();
        var action = intent.getAction();
        var type = intent.getType();
        if (android.content.Intent.ACTION_SEND === action && type != null) {
            if (type.startsWith("text/")) {
                handleSendText(intent); // Handle text being received
            }
            else if (type.startsWith("image/")) {
                handleSendImage(intent); // Handle single image being received
            }
        }
        else if (android.content.Intent.ACTION_SEND_MULTIPLE === action && type != null) {
            if (type.startsWith("image/")) {
                handleSendMultipleImages(intent); // Handle multiple images being received
            }
        }
        else {
            // Handle other intents, such as being started from the home screen
        }
    });
}
exports.navigatingTo = navigatingTo;
function handleSendText(intent) {
    var sharedText = intent.getStringExtra(android.content.Intent.EXTRA_TEXT);
    if (sharedText != null) {
        // Update UI to reflect text being shared
        console.log("sharedText: ", sharedText);
        console.log("Text received!");
        vm.set("sharedText", sharedText);
    }
}
function handleSendImage(intent) {
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
function handleSendMultipleImages(intent) {
    var imageUris = intent.getParcelableArrayListExtra(android.content.Intent.EXTRA_STREAM);
    if (imageUris != null) {
        // Update UI to reflect multiple images being shared
        console.log("imageUris: ", imageUris);
        console.log("Multiple images received!");
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsMERBQTREO0FBQzVELHNEQUE0RTtBQUM1RSxJQUFJLEVBQUUsR0FBRyxJQUFJLGlCQUFVLEVBQUUsQ0FBQztBQUUxQixzQkFBNkIsSUFBZTtJQUV4QyxJQUFJLElBQUksR0FBUyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBRTdCLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO0lBRXpCLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxvQkFBb0IsRUFBRSxVQUFVLElBQUk7UUFDdEYsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM3QixtQ0FBbUM7UUFDbkMsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2xDLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNoQyxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFNUIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVyxLQUFLLE1BQU0sSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNoRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0IsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMseUJBQXlCO1lBQ3JELENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLGlDQUFpQztZQUM5RCxDQUFDO1FBQ0wsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsS0FBSyxNQUFNLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDaEYsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVCLHdCQUF3QixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsb0NBQW9DO1lBQzFFLENBQUM7UUFDTCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixtRUFBbUU7UUFDdkUsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBRVAsQ0FBQztBQTVCRCxvQ0E0QkM7QUFFRCx3QkFBd0IsTUFBOEI7SUFDbEQsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMxRSxFQUFFLENBQUMsQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNyQix5Q0FBeUM7UUFDekMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzlCLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7QUFDTCxDQUFDO0FBRUQseUJBQXlCLE1BQThCO0lBQ25ELElBQUksUUFBUSxHQUFvQixNQUFNLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDL0YsRUFBRSxDQUFDLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbkIsMENBQTBDO1FBRTFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUUvQixJQUFJLFVBQVUsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUM3QyxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUMxRyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUVoQyxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUM3QixDQUFDO0FBQ0wsQ0FBQztBQUVELGtDQUFrQyxNQUE4QjtJQUM1RCxJQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsMkJBQTJCLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDeEYsRUFBRSxDQUFDLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDcEIsb0RBQW9EO1FBQ3BELE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQztJQUM3QyxDQUFDO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgKiBhcyBhcHBsaWNhdGlvbiBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiO1xyXG5pbXBvcnQgeyBQYWdlLCBPYnNlcnZhYmxlLCBFdmVudERhdGEgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlL3BhZ2VcIjtcclxubGV0IHZtID0gbmV3IE9ic2VydmFibGUoKTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBuYXZpZ2F0aW5nVG8oYXJnczogRXZlbnREYXRhKSB7XHJcblxyXG4gICAgbGV0IHBhZ2UgPSA8UGFnZT5hcmdzLm9iamVjdDtcclxuICAgIFxyXG4gICAgcGFnZS5iaW5kaW5nQ29udGV4dCA9IHZtO1xyXG5cclxuICAgIGFwcGxpY2F0aW9uLmFuZHJvaWQub24oYXBwbGljYXRpb24uQW5kcm9pZEFwcGxpY2F0aW9uLmFjdGl2aXR5Q3JlYXRlZEV2ZW50LCBmdW5jdGlvbiAoYXJncykge1xyXG4gICAgICAgIGxldCBhY3Rpdml0eSA9IGFyZ3MuYWN0aXZpdHk7XHJcbiAgICAgICAgLy8gR2V0IGludGVudCwgYWN0aW9uIGFuZCBNSU1FIHR5cGVcclxuICAgICAgICBsZXQgaW50ZW50ID0gYWN0aXZpdHkuZ2V0SW50ZW50KCk7XHJcbiAgICAgICAgbGV0IGFjdGlvbiA9IGludGVudC5nZXRBY3Rpb24oKTtcclxuICAgICAgICBsZXQgdHlwZSA9IGludGVudC5nZXRUeXBlKCk7XHJcblxyXG4gICAgICAgIGlmIChhbmRyb2lkLmNvbnRlbnQuSW50ZW50LkFDVElPTl9TRU5EID09PSBhY3Rpb24gJiYgdHlwZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlLnN0YXJ0c1dpdGgoXCJ0ZXh0L1wiKSkge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlU2VuZFRleHQoaW50ZW50KTsgLy8gSGFuZGxlIHRleHQgYmVpbmcgc2VudFxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUuc3RhcnRzV2l0aChcImltYWdlL1wiKSkge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlU2VuZEltYWdlKGludGVudCk7IC8vIEhhbmRsZSBzaW5nbGUgaW1hZ2UgYmVpbmcgc2VudFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChhbmRyb2lkLmNvbnRlbnQuSW50ZW50LkFDVElPTl9TRU5EX01VTFRJUExFID09PSBhY3Rpb24gJiYgdHlwZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlLnN0YXJ0c1dpdGgoXCJpbWFnZS9cIikpIHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZVNlbmRNdWx0aXBsZUltYWdlcyhpbnRlbnQpOyAvLyBIYW5kbGUgbXVsdGlwbGUgaW1hZ2VzIGJlaW5nIHNlbnRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIEhhbmRsZSBvdGhlciBpbnRlbnRzLCBzdWNoIGFzIGJlaW5nIHN0YXJ0ZWQgZnJvbSB0aGUgaG9tZSBzY3JlZW5cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhhbmRsZVNlbmRUZXh0KGludGVudDogYW5kcm9pZC5jb250ZW50LkludGVudCkge1xyXG4gICAgbGV0IHNoYXJlZFRleHQgPSBpbnRlbnQuZ2V0U3RyaW5nRXh0cmEoYW5kcm9pZC5jb250ZW50LkludGVudC5FWFRSQV9URVhUKTtcclxuICAgIGlmIChzaGFyZWRUZXh0ICE9IG51bGwpIHtcclxuICAgICAgICAvLyBVcGRhdGUgVUkgdG8gcmVmbGVjdCB0ZXh0IGJlaW5nIHNoYXJlZFxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic2hhcmVkVGV4dDogXCIsIHNoYXJlZFRleHQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVGV4dCByZWNlaXZlZCFcIik7XHJcbiAgICAgICAgdm0uc2V0KFwic2hhcmVkVGV4dFwiLCBzaGFyZWRUZXh0KTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaGFuZGxlU2VuZEltYWdlKGludGVudDogYW5kcm9pZC5jb250ZW50LkludGVudCkge1xyXG4gICAgbGV0IGltYWdlVXJpID0gPGFuZHJvaWQubmV0LlVyaT5pbnRlbnQuZ2V0UGFyY2VsYWJsZUV4dHJhKGFuZHJvaWQuY29udGVudC5JbnRlbnQuRVhUUkFfU1RSRUFNKTtcclxuICAgIGlmIChpbWFnZVVyaSAhPSBudWxsKSB7XHJcbiAgICAgICAgLy8gVXBkYXRlIFVJIHRvIHJlZmxlY3QgaW1hZ2UgYmVpbmcgc2hhcmVkXHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSW1hZ2UgcmVjZWl2ZWQhXCIpO1xyXG5cclxuICAgICAgICBsZXQgYXBwQ29udGV4dCA9IGFwcGxpY2F0aW9uLmFuZHJvaWQuY29udGV4dDtcclxuICAgICAgICBsZXQgYml0bWFwID0gYW5kcm9pZC5wcm92aWRlci5NZWRpYVN0b3JlLkltYWdlcy5NZWRpYS5nZXRCaXRtYXAoYXBwQ29udGV4dC5nZXRDb250ZW50UmVzb2x2ZXIoKSwgaW1hZ2VVcmkpXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJiaXRtYXA6IFwiLCBiaXRtYXApO1xyXG5cclxuICAgICAgICB2bS5zZXQoXCJiaXRtYXBcIiwgYml0bWFwKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaGFuZGxlU2VuZE11bHRpcGxlSW1hZ2VzKGludGVudDogYW5kcm9pZC5jb250ZW50LkludGVudCkge1xyXG4gICAgbGV0IGltYWdlVXJpcyA9IGludGVudC5nZXRQYXJjZWxhYmxlQXJyYXlMaXN0RXh0cmEoYW5kcm9pZC5jb250ZW50LkludGVudC5FWFRSQV9TVFJFQU0pO1xyXG4gICAgaWYgKGltYWdlVXJpcyAhPSBudWxsKSB7XHJcbiAgICAgICAgLy8gVXBkYXRlIFVJIHRvIHJlZmxlY3QgbXVsdGlwbGUgaW1hZ2VzIGJlaW5nIHNoYXJlZFxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiaW1hZ2VVcmlzOiBcIiwgaW1hZ2VVcmlzKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk11bHRpcGxlIGltYWdlcyByZWNlaXZlZCFcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbiJdfQ==