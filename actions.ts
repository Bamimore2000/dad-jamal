"use server";

import fs from "fs";
import path from "path";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

interface LoginInput {
  identifier: string;
  password: string;
}

interface Credential {
  email: string;
  phone: string;
  password: string;
  otp?: string;
}

export async function loginAction({ identifier, password }: LoginInput) {
  const filePath = path.join(process.cwd(), "data", "credentials.json");
  const rawData = fs.readFileSync(filePath, "utf-8");
  const users: Credential[] = JSON.parse(rawData);

  // Find the user
  const userIndex = users.findIndex(
    (u) =>
      (u.email === identifier || u.phone === identifier) &&
      u.password === password
  );

  if (userIndex === -1) {
    return { success: false, message: "Invalid email/phone or password" };
  }

  // Generate a 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Update the user's OTP in the credentials file
  users[userIndex].otp = otp;
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

  // Send OTP via email
  const userEmail = users[userIndex].email;
  const msg = {
    to: userEmail,
    from: process.env.SENDGRID_FROM_EMAIL!,
    subject: "Your OTP Code",
    html: `<p>Your OTP code is: <strong>${otp}</strong></p>`,
  };

  try {
    await sgMail.send(msg);
    console.log(`OTP sent to ${userEmail}`);
  } catch (error) {
    console.error("Error sending OTP email:", error);
    return { success: false, message: "Failed to send OTP" };
  }

  return { success: true, message: "OTP sent successfully", otp }; // Do not expose OTP
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

interface Credential {
  email: string;
  phone: string;
  password: string;
  otp?: string;
}

interface ForgotPasswordInput {
  email: string;
}

interface VerifyOtpInput {
  email: string;
  otp: string;
}

interface ResetPasswordInput {
  email: string;
  newPassword: string;
}

/**
 * Step 1: Send OTP to email if it exists
 */
export async function forgotPasswordAction({ email }: ForgotPasswordInput) {
  const filePath = path.join(process.cwd(), "data/credentials.json");
  const rawData = fs.readFileSync(filePath, "utf-8");
  const users: Credential[] = JSON.parse(rawData);

  const userIndex = users.findIndex((u) => u.email === email);

  if (userIndex === -1) {
    return { success: false, message: "Email not found" };
  }

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  users[userIndex].otp = otp;

  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

  const msg = {
    to: email,
    from: process.env.SENDGRID_FROM_EMAIL!,
    subject: "Password Reset OTP",
    html: `<p>Your OTP code is: <strong>${otp}</strong></p>`,
  };

  try {
    await sgMail.send(msg);
    console.log(`OTP sent to ${email}`);
    return { success: true, message: "OTP sent successfully" };
  } catch (error) {
    console.error("Error sending OTP email:", error);
    return { success: false, message: "Failed to send OTP" };
  }
}

/**
 * Step 2: Verify OTP
 */
export async function verifyOtpAction({ email, otp }: VerifyOtpInput) {
  const filePath = path.join(process.cwd(), "data/credentials.json");
  const rawData = fs.readFileSync(filePath, "utf-8");
  const users: Credential[] = JSON.parse(rawData);

  const userIndex = users.findIndex((u) => u.email === email);
  if (userIndex === -1) return { success: false, message: "Email not found" };
  if (users[userIndex].otp !== otp)
    return { success: false, message: "Invalid OTP" };

  return { success: true };
}

/**
 * Step 3: Reset password
 */
export async function resetPasswordAction({
  email,
  newPassword,
}: ResetPasswordInput) {
  const filePath = path.join(process.cwd(), "data/credentials.json");
  const rawData = fs.readFileSync(filePath, "utf-8");
  const users: Credential[] = JSON.parse(rawData);

  const userIndex = users.findIndex((u) => u.email === email);
  if (userIndex === -1) return { success: false, message: "Email not found" };

  users[userIndex].password = newPassword;
  delete users[userIndex].otp;

  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
  return { success: true, message: "Password updated successfully" };
}
