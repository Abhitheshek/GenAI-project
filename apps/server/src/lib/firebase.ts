import {
  initializeApp,
  getApps,
  cert,
  ServiceAccount,
} from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

export const initFirebase = () => {
  const apps = getApps();

  if (apps.length > 0) {
    return { auth: getAuth() };
  }

  const app = initializeApp({
    credential: cert(
      require("../../e-commerce-e84cb-firebase-adminsdk-fbsvc-1536967e1c.json") as ServiceAccount
    ),
    projectId :"e-commerce-e84cb",
  });

  return { auth: getAuth(app) };
};
