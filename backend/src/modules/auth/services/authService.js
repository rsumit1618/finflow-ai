import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { env } from "../../../config/env.js";
import {
  createUser,
  findUserByEmail,
} from "../../../repositories/userRepository.js";

export const registerUserService = async (userData) => {
  const existingUser = await findUserByEmail(userData.email);

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const passwordHash = await bcrypt.hash(userData.password, 10);

  const user = await createUser({
    name: userData.name,
    email: userData.email,
    passwordHash,
  });

  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    env.jwtSecret,
    {
      expiresIn: env.jwtExpiresIn,
    }
  );

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    },
    token,
  };
};

export const loginUserService = async (loginData) => {
  const user = await findUserByEmail(loginData.email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(
    loginData.password,
    user.passwordHash
  );

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    env.jwtSecret,
    {
      expiresIn: env.jwtExpiresIn,
    }
  );

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    },
    token,
  };
};
