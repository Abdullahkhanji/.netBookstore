const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.createNewRoles = functions.firestore
  .document("/users/{uid}")
  .onCreate((snap, context) => {
    console.log(snap.data());
    const uid = snap.data().uid;
    let message = "Welcome to bookly!"
    const additionalClaims = {
      admin: false,
    };
    admin
      .auth()
      .setCustomUserClaims(uid, additionalClaims)
      .then((customToken) => {
        console.log("Roles Created successfully");
      })
      .catch((error) => {
        console.log("Error creating custom token:", error);
      });
    admin
      .firestore()
      .collection("mail")
      .add({
        to: snap.data().email,
        message: {
          subject: "Hello from Bookly!",
          text: "This is the plaintext section of the email body.",
          html: "<code> "+message+" </code>",
        },
      })
      .then(() => console.log("Queued email for delivery!"));
  });


exports.setAdminRole = functions.firestore
  .document("/users/{uid}")
  .onUpdate((change, context) => {
    console.log("function is working");
    if (change.after.data().admin) {
      console.log("this user is admin");
      const uid = context.params.uid;
      const additionalClaims = {
        admin: true,
      };
      admin.auth().setCustomUserClaims(uid, additionalClaims);
    } else if (!change.after.data().admin) {
      console.log("this user is editor");
      const uid = context.params.uid;
      const additionalClaims = {
        admin: false,
      };
      admin.auth().setCustomUserClaims(uid, additionalClaims);
    }
  });

exports.removeUser = functions.firestore
  .document("/users/{uid}")
  .onDelete((snap, context) => {
    console.log("user is gonna delete");
    const uid = snap.data().uid;
    admin
      .auth()
      .deleteUser(uid)
      .then(() => {
        console.log("Successfully deleted user");
      })
      .catch((error) => {
        console.log("Error deleting user:", error);
      });
  });
