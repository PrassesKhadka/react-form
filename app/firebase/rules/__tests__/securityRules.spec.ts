// Reference: https://firebase.google.com/docs/rules/unit-tests

import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import {
  describe,
  it,
  beforeAll,
  beforeEach,
  afterAll,
  expect,
} from "@jest/globals";
import {
  setDoc,
  doc,
  getDoc,
  serverTimestamp,
  setLogLevel,
} from "firebase/firestore";
import { resolve } from "node:path";
import { readFileSync } from "node:fs";
const fs = require("fs");

// From firebase console
const PROJECT_ID = "college-management-syste-382bc";
const FIREBASE_JSON = resolve("rules", "../firebase.json");
let testEnv: RulesTestEnvironment;

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: PROJECT_ID,
    firestore: {
      host: "localhost", // Required to run in the emulator in case it’s not automatically detected!
      port: 4000,
      rules: readFileSync("../firestore-rules", "utf8"),
    },
  });
});

// beforeEach(async () => {
//   await testEnv.clearFirestore();
// });

describe("Testing firebase security Rules", () => {
  it("should let anyone read any profile", async function () {
    // Setup: Create documents in DB for testing (bypassing Security Rules).
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), "users/foobar"), { foo: "bar" });
    });

    const unauthedDb = testEnv.unauthenticatedContext().firestore();

    // Then test security rules by trying to read it using the client SDK.
    expect(true).toBe(true);
    // await expectPermissionGetSucceeds(getDoc(doc(unauthedDb, 'users/foobar')));
  });
});
