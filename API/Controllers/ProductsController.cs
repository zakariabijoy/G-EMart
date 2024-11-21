using Core.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductsController : ControllerBase
{
    private readonly StoreContext _context;

    public ProductsController(StoreContext context)
    {
        _context = context; 
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
    {
        return await _context.Products.ToListAsync();
    }
    
    [HttpGet("{id:int}")] //api/products/2
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
        var product = await _context.Products.FindAsync(id);

        if (product == null)  return NotFound();

        return product;
    }

    [HttpPost]
    public async Task<ActionResult<Product>> CreateProduct(Product product)
    {
        _context.Products.Add(product);

        await _context.SaveChangesAsync();

        return product;
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateProduct(int id, Product product)
    { 
        if (id!= product.Id || !ProductExists(id)) return BadRequest("Cannot update this product");

        _context.Entry(product).State = EntityState.Modified;

        await _context.SaveChangesAsync();

        return NoContent();

    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        var product = await _context.Products.FindAsync(id);

        if (product == null) return NotFound();

        _context.Products.Remove(product);

        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool ProductExists(int id) 
    {
         return _context.Products.Any(x => x.Id == id);
    }
}
