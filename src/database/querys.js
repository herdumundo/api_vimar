const querys = {
  getAllLotes: "select top(50) * from lotes  order by 1 desc ",
  getProducById: "SELECT * FROM animales Where IDE = @IDE",
  getMenuDiario: "SELECT * FROM v_consulta_menu_diario",
  getMenuDiarioConfirmados: "select * from  v_consulta_confirmados_menu   ",

  getVisualizacionRegistrosPTC:
    "execute [mae_ptc_select_registrados_porFecha] @clasificadora='a', @fecha='02/03/2023',@estado_liberacion='l'",
  addNewAnimal: " execute itkv_INSERT @nroCaravana=@nroCaravana, @IDE=@IDE ;",

  deleteProduct: "DELETE FROM [webstore].[dbo].[Products] WHERE Id= @Id",
  getTotalProducts: "SELECT COUNT(*) FROM webstore.dbo.Products",
  ConsultarUsuario:
    "select * from usuarios where usuario= @usuario and clave= @password",
  updateProductById:
    "UPDATE [webstore].[dbo].[Products] SET Name = @name, Description = @description, Quantity = @quantity WHERE Id = @id"
};
module.exports = querys;
