exports.dapobudLocalIpc = async (ipcMain, prisma) => {
  ipcMain.handle("get-dapobud", async () => {
    const dapobud = await prisma.dapobud.findMany();
    return dapobud;
  });
};
