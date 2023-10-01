exports.dapobudLocalIpc = async (ipcMain, prisma) => {
  ipcMain.handle("get-dapobud", async () => {
    const dapobud = await prisma.dapobud.findMany();
    return {
      statusCode: 200,
      message: "Success get data dapobud",
      data: dapobud,
    };
  });
};
