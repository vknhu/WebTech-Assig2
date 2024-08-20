using System;
using System.Collections.Generic;

namespace Assig1.Models;

public partial class SpeedingCategory
{
    public string SpeedCode { get; set; } = null!;

    public string OffenceCode { get; set; } = null!;

    public string SpeedDescription { get; set; } = null!;

    public virtual Offence OffenceCodeNavigation { get; set; } = null!;
}
