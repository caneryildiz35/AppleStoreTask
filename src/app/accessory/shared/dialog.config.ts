import { MatDialogConfig } from "@angular/material/dialog";

export function DialogConfig() {
  const dialogConfig = new MatDialogConfig();

  dialogConfig.autoFocus = true;
  dialogConfig.width = "350px";

  return dialogConfig;
}
