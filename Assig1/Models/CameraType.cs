using System;
using System.Collections.Generic;

namespace Assig1.Models;

public partial class CameraType
{
    public string CameraTypeCode { get; set; } = null!;

    public string CameraType1 { get; set; } = null!;

    public string? ParentCameraTypeCode { get; set; }

    public virtual ICollection<CameraCode> CameraCodes { get; set; } = new List<CameraCode>();

    public virtual ICollection<CameraType> InverseParentCameraTypeCodeNavigation { get; set; } = new List<CameraType>();

    public virtual CameraType? ParentCameraTypeCodeNavigation { get; set; }
}
