using Assignment3_Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Assignment3_Backend.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace Assignment3_Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ReportController : ControllerBase
    {

        private readonly AppDbContext _context; 

        public ReportController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("products-by-brands")]
        public async Task<IActionResult> GetProductsByBrands()
        {
            var products = await _context.Products
                .Include(p => p.Brand)
                .Where(p => p.IsActive)
                .ToListAsync();

            var result = products.GroupBy(p => p.Brand.Name)
                                 .Select(g => new { Brand = g.Key, Count = g.Count() })
                                 .ToList();

            return Ok(result);
        }


        [HttpGet("products-by-types")]
        public async Task<IActionResult> GetProductsByTypes()
        {
            var products = await _context.Products
                .Include(p => p.ProductType)
                .Where(p => p.IsActive)
                .ToListAsync();

            var result = products.GroupBy(p => p.ProductType.Name)
                                 .Select(g => new { ProductType = g.Key, Count = g.Count() })
                                 .ToList();

            return Ok(result);
        }
     
        [HttpGet("GetActiveProducts")]
       
        public async Task<IActionResult> GetActiveProducts()
        {
            var result = await _context.Products
                .Where(p => p.IsActive)
                .Include(p => p.Brand)
                .Include(p => p.ProductType)
                .GroupBy(p => new { ProductTypeName = p.ProductType.Name, BrandName = p.Brand.Name })
                .Select(v => new
                {
                    ProductType = v.Key.ProductTypeName,
                    Brand = v.Key.BrandName,
                    Products = v.Select(p => new
                    {
                        p.ProductId,
                        p.Name,
                        p.Price,
                        p.IsActive
                    }).ToList() 
                })
                .ToListAsync();
            return Ok(result);
        }
    }
}
