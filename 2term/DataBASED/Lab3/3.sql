----------------------------------------------- 1
delete from Category

CREATE TABLE Category (
    CategoryID INT IDENTITY(1,1) PRIMARY KEY,
    CategoryName NVARCHAR(50) NOT NULL UNIQUE
);

ALTER TABLE Category
ADD HierarchyLevel hierarchyid;

----------------------------------------------- 2
CREATE OR ALTER PROCEDURE DisplayAllHierarchy
AS
BEGIN
    SELECT 
        CategoryID,
        CategoryName,
        CASE 
            WHEN CategoryName = 'Root' THEN '/'
            ELSE HierarchyLevel.ToString()
        END as HierarchyString,
        CASE 
            WHEN CategoryName = 'Root' THEN 0
            ELSE HierarchyLevel.GetLevel()
        END as HierarchyLevel
    FROM 
        Category
    ORDER BY 
        HierarchyLevel
END;


EXEC DisplayAllHierarchy;


---------------------------------------------------- 3
CREATE PROCEDURE AddChildNode
    @ParentNode hierarchyid,
    @CategoryName NVARCHAR(50)
AS
BEGIN
    DECLARE @ChildNode hierarchyid;

    -- находим максимальный дочерний узел для данного родительского узла
    SELECT @ChildNode = MAX(HierarchyLevel)
    FROM Category
    WHERE HierarchyLevel.GetAncestor(1) = @ParentNode;

    -- если дочерних узлов нет, создаем первый дочерний узел
    IF @ChildNode IS NULL
    BEGIN
        SET @ChildNode = @ParentNode.GetDescendant(NULL, NULL);
    END
    -- иначе создаем следующий дочерний узел
    ELSE
    BEGIN
        SET @ChildNode = @ParentNode.GetDescendant(@ChildNode, NULL);
    END

    -- добавляем новую категорию с дочерним узлом
    INSERT INTO Category (CategoryName, HierarchyLevel)
    VALUES (@CategoryName, @ChildNode);
END;

-- Add Root
DECLARE @ParentNode hierarchyid;
DECLARE @CategoryName NVARCHAR(50);
SET @ParentNode = NULL;
SET @CategoryName = 'Root';
EXEC AddChildNode @ParentNode, @CategoryName;
go

-- Add /1
DECLARE @ParentNode hierarchyid;
DECLARE @CategoryName NVARCHAR(50);
SET @ParentNode = '/';
SET @CategoryName = 'Node 1';
EXEC AddChildNode @ParentNode, @CategoryName;
go
-- Add /1/1
DECLARE @ParentNode hierarchyid;
DECLARE @CategoryName NVARCHAR(50);
SET @ParentNode = '/1/';
SET @CategoryName = 'Node 1.1';
EXEC AddChildNode @ParentNode, @CategoryName;
go
-- Add /1/1/1
DECLARE @ParentNode hierarchyid;
DECLARE @CategoryName NVARCHAR(50);
SET @ParentNode = '/1/1/';
SET @CategoryName = 'Node 1.1.1';
EXEC AddChildNode @ParentNode, @CategoryName;
go
-- Add /2
DECLARE @ParentNode hierarchyid;
DECLARE @CategoryName NVARCHAR(50);
SET @ParentNode = '/';
SET @CategoryName = 'Node 2';
EXEC AddChildNode @ParentNode, @CategoryName;
go
-- Add /2/1
DECLARE @ParentNode hierarchyid;
DECLARE @CategoryName NVARCHAR(50);
SET @ParentNode = '/2/';
SET @CategoryName = 'Node 2.1';
EXEC AddChildNode @ParentNode, @CategoryName;
go
-- Add /2/1/1
DECLARE @ParentNode hierarchyid;
DECLARE @CategoryName NVARCHAR(50);
SET @ParentNode = '/2/1/';
SET @CategoryName = 'Node 2.1.1';
EXEC AddChildNode @ParentNode, @CategoryName;
EXEC DisplayAllHierarchy;


---------------------------------------------------- 4
create or alter procedure MoveChildren
  @old_parent hierarchyid,
  @new_parent hierarchyid
as begin
  declare children_cur cursor local for
    select HierarchyLevel from Category where HierarchyLevel.GetAncestor(1) = @old_parent;
  open children_cur;
    declare @child_old_node hierarchyid, @child_new_node hierarchyid;
    fetch next from children_cur into @child_old_node;
    while @@FETCH_STATUS = 0
    begin
      set @child_new_node = @new_parent.GetDescendant((select MAX(HierarchyLevel) from Category where HierarchyLevel.GetAncestor(1) = @new_parent), NULL);
      update Category 
        set HierarchyLevel = @child_new_node 
        where HierarchyLevel = @child_old_node;
      exec MoveChildren @child_old_node, @child_new_node;
      fetch next from children_cur into @child_old_node;
    end;
  close children_cur;
  deallocate children_cur;
end;

begin
  declare @old_parent hierarchyid, @new_parent hierarchyid;
  select @old_parent = HierarchyLevel from Category where CategoryName = 'Node 1';
  select @new_parent = HierarchyLevel from Category where CategoryName = 'Node 2';
  exec MoveChildren @old_parent, @new_parent;
end;

select * from Category
EXEC DisplayAllHierarchy;
