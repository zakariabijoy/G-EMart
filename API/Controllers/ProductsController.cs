using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductsController(IGenericRepository<Product> repo) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<Product>>> GetProducts(string? brand, string? type, string? sort)
    {
        var spec = new ProductSpecification(brand, type, sort);
        return Ok(await repo.ListAsync(spec));
    }
    
    [HttpGet("{id:int}")] //api/products/2
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
        var product = await repo.GetByIdAsync(id);

        if (product == null)  return NotFound();

        return product;
    }

    [HttpPost]
    public async Task<ActionResult<Product>> CreateProduct(Product product)
    {
        repo.Add(product);

        if(await repo.SaveAllAsync())
        {
            return CreatedAtAction("GetProduct",new {id = product.Id}, product);
        }

        return BadRequest("Problem creating product");
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateProduct(int id, Product product)
    { 
        if (id!= product.Id || !ProductExists(id)) return BadRequest("Cannot update this product");

        repo.Update(product);

        if(await repo.SaveAllAsync())
        {
            return NoContent();
        }

        return BadRequest("Problem updating product");
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        var product = await repo.GetByIdAsync(id);

        if (product == null) return NotFound();

        repo.Remove(product);

        if(await repo.SaveAllAsync())
        {
            return NoContent();
        }

        return BadRequest("Problem deleting product");
    }

    [HttpGet("brands")]
    public async Task<ActionResult<IReadOnlyList<string>>> GetBrands()
    {
        //TODO: Implement  method
        return Ok();
    }

    [HttpGet("types")]
    public async Task<ActionResult<IReadOnlyList<string>>> GetTypes()
    {
        //TODO: Implement  method
        return Ok();
    }

    private bool ProductExists(int id) 
    {
         return repo.Exists(id);
    }
}
