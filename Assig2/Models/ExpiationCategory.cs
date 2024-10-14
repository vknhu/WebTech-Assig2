using System;
using System.Collections.Generic;

namespace Assig1.Models;

public partial class ExpiationCategory
{
    public int CategoryId { get; set; }

    public string CategoryName { get; set; } = null!;

    public string? Description { get; set; }

    public int? ParentCategoryId { get; set; }

    public virtual ICollection<ExpiationCategory> InverseParentCategory { get; set; } = new List<ExpiationCategory>();

    public virtual ExpiationCategory? ParentCategory { get; set; }

    public virtual ICollection<Section> Sections { get; set; } = new List<Section>();
}
