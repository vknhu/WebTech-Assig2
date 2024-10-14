using System;
using System.Collections.Generic;

namespace Assig2.Models;

public partial class Offence
{
    public string OffenceCode { get; set; } = null!;

    public string Description { get; set; } = null!;

    public int? ExpiationFee { get; set; }

    public int? AdultLevy { get; set; }

    public int? CorporateFee { get; set; }

    public int? TotalFee { get; set; }

    public int? DemeritPoints { get; set; }

    public int? SectionId { get; set; }

    public string? SectionCode { get; set; }

    public virtual Section? Section { get; set; }

    public virtual ICollection<SpeedingCategory> SpeedingCategories { get; set; } = new List<SpeedingCategory>();
}
