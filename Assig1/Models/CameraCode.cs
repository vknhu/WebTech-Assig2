using System;
using System.Collections.Generic;

namespace Assig1.Models;

public partial class CameraCode
{
    public int LocationId { get; set; }

    public string CameraTypeCode { get; set; } = null!;

    public string Suburb { get; set; } = null!;

    public string RoadName { get; set; } = null!;

    public string? RoadType { get; set; }

    public virtual CameraType CameraTypeCodeNavigation { get; set; } = null!;
}
