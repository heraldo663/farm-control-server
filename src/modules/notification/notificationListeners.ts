import { User } from ".prisma/client";
import { USER_CREATED } from "modules/shared/eventConstants";
import { Subscribe } from "providers/events/events";

export function notificationListeners(subscribe: Subscribe): void {
  subscribe(USER_CREATED, (user) => {
    console.log(user as User);
  });
}
