import { Module } from "core";
import { notificationBoot } from "./notificationBoot";
import { notificationListeners } from "./notificationListeners";

export const NotificationModule: Module = {
  Listener: notificationListeners,
  boot: notificationBoot,
};
