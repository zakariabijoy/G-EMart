namespace Core.Specifications;

public class ProductSpecParams
{
   private List<String> _brands = [];
   public List<String> Brands
   {
      get => _brands;
      set 
      {
            _brands = [.. value.SelectMany(x => x.Split(',', StringSplitOptions.RemoveEmptyEntries))];
      }
   }

   private List<String> _types = [];
   public List<String> Types
   {
      get => _types;
      set 
      {
            _types = [.. value.SelectMany(x => x.Split(',', StringSplitOptions.RemoveEmptyEntries))];
      }
   }

    public string? Sort { get; set; }
}
