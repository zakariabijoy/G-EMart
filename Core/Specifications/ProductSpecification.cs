using Core.Entities;

namespace Core.Specifications;

public class ProductSpecification : BaseSpecification<Product>
{
    public ProductSpecification(ProductSpecParams SpecParams) : base(x =>
        (! SpecParams.Brands.Any() ||SpecParams.Brands.Contains(x.Brand))  &&
        (! SpecParams.Types.Any() ||SpecParams.Types.Contains(x.Type))
    )
    {
      switch (SpecParams.Sort)
      {
        case "priceAsc":
          AddOrderBy(x => x.Price);
          break;
        case "priceDesc":
          AddOrderByDescending(x => x.Price); 
          break;
        default:
            AddOrderBy(x => x.Name);
            break;
      }
    }
}
